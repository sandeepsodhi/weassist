function isalphanum(ele)
{
    var r=/\W$/i;
    if(r.test(ele.value))
    {
         alert("Only Alpha Numeric characters are allowed in this field.");
         ele.value="";
         ele.focus();
    }
}
function isalpha(ele)
{
    var r=/[^a-zA-Z]+/i;
    if(r.test(ele.value))
    {
         alert("Only Alphabets are allowed in this field.");
         ele.value="";
         ele.focus();
    }
}
function isnum(ele)
{
    var r=/\D$/i;
    if(r.test(ele.value))
    {
         alert("Only Numerics are allowed in this field.");
         ele.value="";
         ele.focus();
    }
}
    
function phonenumber(ele)  
{  
    var phoneno = /^\d{10}$/;  
    if((inputtxt.value.match(phoneno))  
    {  
        return true;  
    }  
    else  
    {  
        alert("message");  
        return false;  
    }  
}

function validateform(mmyform)
{
    var em=/[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+/;
    myform=document.forms[mmyform];
    if(myform.f_name.value=="" || myform.pswd.value=="" || myform.email.value=="" || myform.contact.value=="")
    {
         alert("Some of the fields are Empty.");
         return false;
         // myform.onsubmit=false;
    }
        else if(!em.test(myform.email_id.value))
            {  
                alert("Enter a valid E-mail!");
               //  myform.onsubmit=false;
                 return false;
            }
/*          else if(myform.captcha.value!=myform.act_captcha.value)
                {
                    alert("Enter a valid captcha"); 
                    return false;
                } */
}

function validatesubform(mmyform)
{

    myform=document.forms[mmyform];
    if(myform.subname.value=="" || myform.subdesc.value=="")
    {
         alert("Some of the fields are Empty.");
         myform.onSubmit=false;
    }
     
}
function validatetestform(mmyform)
        {

           /* myform=document.forms[mmyform];
            if(myform.subname.value=="" || myform.subdesc.value=="")
             {
                 alert("Some of the fields are Empty.");
                 myform.onSubmit=false;
             }
*/
        }

  /*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


