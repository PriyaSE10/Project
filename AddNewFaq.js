import React, { useState } from 'react'
import { addFaqQuestions, editFaqQuestions } from '../login/Api/apis';
import './Faq.css'
import { useSnackbarContext } from '@ohif/ui';


const AddNewFaq = ({getFaqQuestionApi, setAddQuestion, setEditQuestion,editQuestion,editQuestionDetails }) =>{
  let initialValue ={question:'', answer: ''};
  if(editQuestion){
    initialValue=editQuestionDetails;
  }

  const [newValue, setNewValue]= useState(initialValue)
   const [closeIcon, setCloseIcon] = useState(true)
  const [errors, setErrors] = useState({
    questionErr:'',
    answerErr:''
  })

  const snackbar = useSnackbarContext();

  const renderErrorMessage = key => {
    return (
      <div
        style={{
          color: 'red',
          fontSize: '11px',
          marginTop: '3px',
          marginLeft: '5px',
          paddingBottom: '0px',
        }}
      >
        {errors[key]}
      </div>
    );
  };

  const changeError=(field, msg)=>{
    setErrors((inital)=>{
      return{
        ...inital,
        [field] : msg
      }
    })
  }
  const removeFaqSpaces =(s)=>{
    s = s.trim();
    return s.replace(/ +/g, ' ');

  }

  const HandleAddQuestionConfirm = async (e) =>{
  e.preventDefault()
  console.log('hello', 'handleAddQuestionConfirm')
  newValue.question =removeFaqSpaces( newValue.question);
  newValue.answer = removeFaqSpaces(newValue.answer);

  let flag = false;
  setErrors({
    questionErr:'',
    answerErr:''
  })

 if(!newValue.question || newValue.question === ''){
    flag = true;
    changeError('questionErr', 'Please enter the question')
  }
if(!newValue.answer || newValue.answer === ''){
  flag = true;
  changeError('answerErr', 'Please enter the answer')
}
if(newValue.question.length > 20){
  flag = true;
  changeError('questionErr', "Qusetion should be less than 20 characters.")
}

console.log('eeeeeeeeeeeeeeeeeeee', editQuestionDetails.valueId , newValue)

 if(!flag){
  try{
    let response;

    if(editQuestion){
  if(newValue.question === editQuestionDetails.question && newValue.answer === editQuestionDetails.answer){
  //  window.alert('Please create some changes!')
  snackbar.show({
    message:'Please create some Changes!',
    type:"error"
  })

    return;
  }
  const payload = {
         valueId: editQuestionDetails.valueId,
         data:newValue
  }
  response = await editFaqQuestions(payload)
    }
    else{
      const payload = {
        data : newValue
      }
      response = await addFaqQuestions (payload)
    }

    const jsonRes = await response.json();
    console.log('hellooooooooooo',jsonRes)

    if(response?.status === 200){
     // window.alert(jsonRes.message)
      snackbar.show({
        message: `${jsonRes.message}`,
        type: 'success',
      });
      setNewValue({
        answer:'',
        question:''
      })
      getFaqQuestionApi();
      setAddQuestion(false);
      setEditQuestion(false)
    }
  }
  catch(err){
    console.log('Error: ',err)
    // window.alert('Something went wrong!')
    snackbar.show({
      message:'Something went wrong!'
    })
  }
 }
}

  const handleCancelButton = () =>{
    setAddQuestion(false)
    setEditQuestion(false)
    setNewValue({
      question:'',
      answer: ''
    })
  }
  const onChangeHandle=(e,item)=>{
    setNewValue({
      ...newValue,
      [item]: e.target.value
    })

  }
   return ( closeIcon && (
    <div className='simpleDialog simpleDialog_lg'>
      <form>
      <div className='header'>
        <div>
          <span
            className="closeBtn"><span className='closeIcon' onClick={()=>setCloseIcon(false)}>X</span>
          </span>
          <h4 className='title'>Add FAQ Question</h4>
        </div>
        </div>
        <div className='qus-field'>
        <label>Question: </label>
       <input  type='text' value={newValue.question} className='simpleDialogInput qus-input' onChange={(e)=>onChangeHandle(e, 'question')} placeholder='Enter the question'/>
       {renderErrorMessage('questionErr')}
        </div>
       <div className='qus-field'>
       <label>Answer:</label>
       <textarea type='text' value={newValue.answer} className='simpleDialogInput simpleDialogTextArea input-box' onChange={(e)=>onChangeHandle(e, 'answer')} placeholder='Write something here!'></textarea>
        {renderErrorMessage('answerErr')}
       </div>
        <div className='btn-wrapper'  style={{margin:'15px 18px'}}>
        <button className='btn btn-primary' onClick={HandleAddQuestionConfirm}>Confirm</button>
          <button className='btn btn-primary' onClick={handleCancelButton}>Cancel</button>
        </div>
      </form>
    </div>
   )
   )
}

export default AddNewFaq
