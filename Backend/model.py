import json 
from tensorflow.keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

tokenizer_path = 'tokenizer.json'


with open(tokenizer_path, 'r') as json_file:
    tokenizer_data = json.load(json_file)

tokenizer = tokenizer_from_json(tokenizer_data)

print(tokenizer)


difficulty_model = load_model('difficulty_model.h5')
difficulty_model.summary()


with open('difficulty_type_mapping.json', 'r') as json_file:
    difficulty_type_mapping = json.load(json_file)

print(difficulty_type_mapping)


MAX_NUMBER_OF_LETTERS = 550
def tokenize_text(text, tokenizer):
    tokenized_text = tokenizer.texts_to_sequences([text])[0]
    tokenized_text = pad_sequences([tokenized_text], maxlen=MAX_NUMBER_OF_LETTERS, padding='post', truncating='post')[0]
    return tokenized_text.tolist()

def predict_text(model, types_list, tokenizer, text):
    tokenized_text = tokenize_text(text, tokenizer)
    probs = model.predict([tokenized_text])[0]
    result = {types_list[index]: probs[index] for index in range(len(types_list))}
    return result

problem = "given an array of integer nums and an integer target, return index of the two number such that they add up to target. you may assume that each input would have exactly one solution, and you may not use the same element twice. you can return the answer in any order."
probs = predict_text( difficulty_model, list(difficulty_type_mapping.keys()), tokenizer, problem)
print(probs)
