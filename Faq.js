import React, { useState, useEffect } from 'react';
import './Faq.css';
import AddNewFaq from './AddNewFaq';
import { ICONS } from '@ohif/ui/src';
import { getFaqQuestions, deleteFaqQuestions } from '../login/Api/apis';
import { useSnackbarContext } from '@ohif/ui';



const Faq = ({ setShowFaq }) => {
  const [faq, setFaq] = useState([]);
  const [readMore, setReadMore] = useState(
    Array(faq?.length)?.fill(false)
  );
  const [addQuestion, setAddQuestion] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);
  const [editQuestionDetails, setEditQuestionDetails] = useState({});
  const [showIcon, setShowIcon] = useState(false);
  const role = sessionStorage.getItem("role")

const snackbar = useSnackbarContext();

const handleShowIcon =(e)=>{
   e.preventDefault();
  setShowIcon(!showIcon)
  console.log('iconssssss',handleShowIcon)

}

console.log("roleeee",role)
  // const expandReview = index => {
  //   const newIsExpanded = [...readMore];
  //   newIsExpanded[index] = !newIsExpanded[index];
  //   setReadMore(newIsExpanded);

  // };
  const addNewNodeHandler = () => {
    setAddQuestion(true);
  };

  const getFaqQuestionApi = async () => {
    try {
      const resp = await getFaqQuestions();
      const jsonRes = await resp.json();
      if (resp.status === 200) {
        setFaq(jsonRes?.data?.docs[0].data);
        const initialExpand = new Array(jsonRes.length).fill(false);
        setReadMore(initialExpand);

      }
    } catch (err) {
      console.log('Error:', err);
      window.alert('Something went wrong!');

    }
  };

  // console.log('tttttttttttttttttttttttttt', faq)

  const handleEditQuestion = question => {
    setEditQuestion(true);
    setAddQuestion(true);
    console.log("quesss",question)
    setEditQuestionDetails(question);
  };

  const handleDeleteQuestion = async valueId => {
    const isConfirmDelete = window.confirm(
      'Are you sure you want to delete question.'
    );
    snackbar.show({
      message:'Delete faq successfully!',
      type:"success"
    })
    console.log("valueeeeee",valueId)
    if (!isConfirmDelete) {
      return;
    }
    try {
      await deleteFaqQuestions({valueId});
      getFaqQuestionApi();
    } catch (err) {
      console.log('Error:', err);
      snackbar.show({
        message:'Something went wrong!',
        type:'error'
      })
      // window.alert('Something went wrong!');
    }
  };

  useEffect(() => {
    getFaqQuestionApi();
  }, []);



  if (addQuestion) {
    return (
      <AddNewFaq
        getFaqQuestionApi={getFaqQuestionApi}
        setAddQuestion={setAddQuestion}
        editQuestion={editQuestion}
        setEditQuestion={setEditQuestion}
        editQuestionDetails={editQuestionDetails}
      />
    );
  }
console.log("faqqqqqq",faq)

  return (
        <div className="simpleDialog simpleDialog_lg">
          <form className='faq-simpleDialog'>
            <div className="header">
              <span className="closeBtn">
                <span className="closeIcon" onClick={() => setShowFaq(false)}>
                  x
                </span>
              </span>
              <h4 className="title">FAQ</h4>
            </div>
            <div className="contents " >
              {faq.length > 0  ?
                faq?.map((item, index) => {
                  return (
                    <div key={index} className="main-heading">

                      <div className=" wrappers" >
                        <div className="question">
                          Question: <span>{item?.question}</span>
                        </div>
                      {role == "Admin" &&  <div className="icons-wrap">
                          <ICONS.edit
                            onClick={() => handleEditQuestion(item)}
                          />
                          <ICONS.trash
                            onClick={() => handleDeleteQuestion(item.valueId)}
                          />
                           <button className="btn-icon" onClick={handleShowIcon}>
                             {showIcon ? '-' : '+'}
                          </button>
                        </div>}
                    { showIcon &&
                      <div className="answer">
                      <p><b>Answer:</b> {item?.answer}</p>
                        {/* <span>Answer: </span>
                        {readMore[index]
                          ? item?.answer
                          : item?.answer?.substring(0, 95)}
                        {item?.answer?.length > 95 &&
                          (!readMore[index] ? (
                            <span
                            className='more-button  '
                              onClick={() => expandReview(index)}
                            >
                              ...Read More
                            </span>
                          ) : (
                            <span
                            className='more-button'
                              onClick={() => expandReview(index)}
                            >&nbsp;Show Less</span>
                          ))} */}
                      </div>
                    }
                    </div>

                      {/* <button
                        className="read-more"
                        onClick={() => expandReview(index)}
                      >
                        {readMore[index] ? 'show Less' : 'read more'}
                      </button>} */}
                    </div>
                  );
                }):<div className='message' >No Faq Found</div>

                }

            </div>

            <div
              style={{
                padding: '10px 15px',
                borderTop: '1px solid #e3e3e3',
                display: 'flex',
                justifyContent: 'flexStart',
                gap: '10px',
              }}
            >
              <button className="btn btn-primary " onClick={addNewNodeHandler}>
                <span className="add-btn-symbol plus">+</span>
                Add FAQ
              </button>
              <button
                className="btn btn-primary "
                onClick={() => setShowFaq(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
  );
};

export default Faq;
