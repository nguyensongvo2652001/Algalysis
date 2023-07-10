import Tag from "../UI/Tag/Tag";
import Navbar from "../Navbar/Navbar";
import classes from "./EditProblem.module.css";
import TagsList from "./TagsList/TagsList";
import RelatedProblems from "./RelatedProblems/RelatedProblems";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import useSendRequest from "../../hooks/useSendRequest";
import useErrorHandling from "../../hooks/useErrorHandling";
import { useParams } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import LoadingModal from "../UI/Modal/LoadingModal/LoadingModal";
import { successAlert } from "../../utils/alert";

const EditProblem = () => {
  const params = useParams();
  const problemId = params.id;

  const [problem, setProblem] = useState(undefined);
  const [problemAnalyzeResult, setProblemAnaylyzeResult] = useState(
    problem?.an
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { sendRequest } = useSendRequest();
  const { handleError } = useErrorHandling();

  const problemNameRef = useRef();
  const problemTextRef = useRef();

  useEffect(() => {
    const getProblem = async () => {
      const getProlemURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/problem/${problemId}`;
      try {
        const response = await sendRequest(getProlemURL);
        const content = await response.json();

        if (content.status !== "success") {
          throw new Error(content.message);
        }

        const { problem } = content.data;
        setProblem(problem);
      } catch (err) {
        handleError(err);
      }
    };

    getProblem();
  }, [handleError, problemId, sendRequest]);

  const saveButtonClickHandler = async () => {
    setIsSaving(true);
    const updateProblemURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/problem/${problemId}`;
    try {
      const data = {
        name: problemNameRef.current.value,
        text: problemTextRef.current.value,
      };
      const response = await sendRequest(updateProblemURL, {
        body: JSON.stringify(data),
        method: "PATCH",
      });
      const content = await response.json();

      if (content.status !== "success") {
        throw new Error(content.message);
      }

      successAlert("Save problem successfully");
    } catch (err) {
      handleError(err);
    }

    setIsSaving(false);
  };

  const analyzeButtonClickHandler = async () => {
    const analyzeProblemURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/problem/${problemId}/analyze`;
    setIsAnalyzing(true);
    try {
      const response = await sendRequest(analyzeProblemURL, {
        method: "POST",
      });
      const content = await response.json();

      if (content.status !== "success") {
        throw new Error(content.message);
      }

      const { analyzeResult } = content.data;
      setProblemAnaylyzeResult(analyzeResult);
    } catch (err) {
      handleError(err);
    }

    setIsAnalyzing(false);
  };

  return (
    <div className={classes.problem__container}>
      <Navbar />
      {isSaving && <LoadingModal />}
      {!problem && <LoadingSpinner />}
      {problem && (
        <div className={classes.problem__content}>
          <div className={classes.problem__info}>
            <input
              className={classes.problem__name}
              type="text"
              defaultValue={problem.name}
              ref={problemNameRef}
            />
            <textarea
              className={classes.problem__text}
              defaultValue={problem.text}
              ref={problemTextRef}
            />
          </div>

          <div className={classes.problem__analyzeResult}>
            <div className={classes.problem__analyzeResultButtons}>
              <button
                className={classes.problem__analyzeButton}
                onClick={analyzeButtonClickHandler}
              >
                Analyze
              </button>
              <button
                className={classes.problem__saveButton}
                onClick={saveButtonClickHandler}
              >
                Save
              </button>
            </div>
            {isAnalyzing && <LoadingSpinner />}
            {!isAnalyzing && problemAnalyzeResult && (
              <>
                <div className={classes.problem__difficultyResult}>
                  <Tag value={problemAnalyzeResult.difficulty.toLowerCase()} />
                  <p className={classes.problem__analyzeInfo}>
                    Compared to other problems, our model predict this problem
                    to be {problemAnalyzeResult.difficulty}
                  </p>
                </div>

                <div className={classes.problem__complexityResult}>
                  <p className={classes.problem__complexityResultValue}>
                    O({problemAnalyzeResult.complexity})
                  </p>
                  <p className={classes.problem__analyzeInfo}>
                    Our model believe you can solve this problem within O(
                    {problemAnalyzeResult.complexity}) complexity
                  </p>
                </div>

                <TagsList tags={problemAnalyzeResult.tags} />

                <RelatedProblems
                  relatedProblems={problemAnalyzeResult.relatedProblems}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProblem;
