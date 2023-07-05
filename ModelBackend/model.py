print("LOADING LIBRARIES")
import json 
import os
import pandas as pd

from tensorflow.keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

print("LOADING ENVIRONMENT VARIABLES")
load_dotenv()

PROBLEM_MAX_NUMBER_OF_LETTERS = int(os.getenv("PROBLEM_MAX_NUMBER_OF_LETTERS"))
NUMBER_OF_TAGS_RETURN = int(os.getenv("NUMBER_OF_TAGS_RETURN"))
NUMBER_OF_SIMILAR_PROBLEMS_RETURN = int(os.getenv("NUMBER_OF_SIMILAR_PROBLEMS_RETURN"))

print("LOADING TOKENIZER")
tokenizer_path = 'tokenizer.json'

with open(tokenizer_path, 'r') as json_file:
    tokenizer_data = json.load(json_file)

tokenizer = tokenizer_from_json(tokenizer_data)


print("LOADING MODELS")
difficulty_model = load_model('difficulty_model.h5')
tag_model = load_model('tag_model.h5')
complexity_model = load_model("complexity_model.h5")

print("LOADING TYPE MAPPING")
with open('difficulty_type_mapping.json', 'r') as json_file:
    difficulty_type_mapping = json.load(json_file)
with open('complexity_type_mapping.json', 'r') as json_file:
    complexity_type_mapping = json.load(json_file)
with open('tag_type_mapping.json', 'r') as json_file:
    tag_type_mapping = json.load(json_file)

print("GETTING ALL AVAILABLE PROBLEMS FROM DATA")
dataset_csv = "data.csv"
data_frame = pd.read_csv(dataset_csv)
dataset_problems = data_frame["Problem"].tolist()
dataset_problem_links = data_frame["Link"].tolist()
dataset_problem_names = []
# Because there are no problem names in the dataset so we need to generate it based on the link 
for link in dataset_problem_links:
    words = link.strip().split("/")
    current_word_index = -1 
    while words[current_word_index] == "description" or words[current_word_index] == "":
        current_word_index -= 1
    
    problem_name = words[current_word_index]
    problem_name = problem_name.replace("-", " ")
    problem_name = problem_name[0].upper() + problem_name[1:]
    dataset_problem_names.append(problem_name)


def tokenize_text(text, tokenizer):
    tokenized_text = tokenizer.texts_to_sequences([text])[0]
    tokenized_text = pad_sequences([tokenized_text], maxlen=PROBLEM_MAX_NUMBER_OF_LETTERS, padding='post', truncating='post')[0]
    return tokenized_text.tolist()

def clean_text(text):
  text = text.lower()

  return text


def compare_text(text1, text2):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([text1, text2])
    similarity_score = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])
    similarity_probability = similarity_score[0][0]

    return similarity_probability

def analyze_text_using_model(model, types_list, tokenized_text):
    probs = model.predict([tokenized_text])[0]
    result = {types_list[index]: probs[index] for index in range(len(types_list))}
    return result

def analyze_text(text):
    print("ANALYZING THE TEXT")
    if len(text) >= PROBLEM_MAX_NUMBER_OF_LETTERS:
        raise ValueError(f"Text can not be longer than {PROBLEM_MAX_NUMBER_OF_LETTERS} letters.")


    text = clean_text(text)
    tokenized_text = tokenize_text(text, tokenizer)
    analyze_result = dict()

    print("COMPARE THE CURRENT PROBLEM TO OTHER PROBLEM")
    dataset_problems_comparision = [(dataset_problem_links[i], dataset_problem_names[i],compare_text(text, dataset_problem)) for i, dataset_problem in enumerate(dataset_problems)]
    sorted_dataset_problems_comparision = sorted(dataset_problems_comparision, key = lambda item: -item[2])
    top_similar_problems = sorted_dataset_problems_comparision[:NUMBER_OF_SIMILAR_PROBLEMS_RETURN]
    analyze_result["similar_problems"] = [{
        "link": item[0],
        "name": item[1]
    } for item in top_similar_problems]

    print("ANALYZING THE DIFFICULTY")
    difficulty_probs = analyze_text_using_model(difficulty_model, list(difficulty_type_mapping.keys()), tokenized_text)
    # We only take the difficulty with the highest probability
    highest_prob_difficulty = None
    highest_prob = 0 
    for key in difficulty_probs.keys():
        if difficulty_probs[key] > highest_prob:
            highest_prob = difficulty_probs[key]
            highest_prob_difficulty = key 
    
    analyze_result["difficulty"] = highest_prob_difficulty

    print("ANALYZING THE COMPLEXITY")
    complexity_probs = analyze_text_using_model(complexity_model, list(complexity_type_mapping.keys()), tokenized_text)
    # We only take the complexity with the highest probability
    highest_prob_complexity = None
    highest_prob = 0 
    for key in complexity_probs.keys():
        if complexity_probs[key] > highest_prob:
            highest_prob = complexity_probs[key]
            highest_prob_complexity = key 
    
    analyze_result["complexity"] = highest_prob_complexity

    print("ANALYZING THE TAG")
    tag_probs = analyze_text_using_model(tag_model, list(tag_type_mapping.keys()), tokenized_text)

    # We will take the top tags with the largest probability 
    tag_probs_tuple_list = [(tag, tag_probs[tag]) for tag in tag_probs ]
    sorted_tag_probs_tuple_list = sorted(tag_probs_tuple_list, key = lambda item: -item[1])
    top_highest_prob_tags = sorted_tag_probs_tuple_list[:NUMBER_OF_TAGS_RETURN] 
    analyze_result["tags"] = [{
        "label": item[0], 
        "prob": float(item[1])
    } for item in top_highest_prob_tags]

    return analyze_result


if __name__ == "__main__":
    problem = "given an array of integer nums and an integer target, return index of the two number such that they add up to target. you may assume that each input would have exactly one solution, and you may not use the same element twice. you can return the answer in any order."

    result = analyze_text(problem)
    print(result)
