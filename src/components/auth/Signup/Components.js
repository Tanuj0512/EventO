import styled from 'styled-components';
import banner from "./overlay-background.jpg"

export const Container = styled.div`
align-items:center;
background-color: #fff;
border-radius: 10px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif ;
position:relative;
overflow: hidden;
top:10vh;
height:80vh;
width: 80vw;
max-width: 100%;
min-height: 400px;
`;

export const SignUpContainer = styled.div`
 position: absolute;
 display:flex;
 flex-direction:column;
 align-items:center;  
 top: 0;
 height: 80%;
 transition: all 0.6s ease-in-out;
 left: 0;
 width: 50%;
 opacity: 0;
 z-index: 1;
 ${props => props.signinIn !== true ? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 ` 
 : null}
`;


export const SignInContainer = styled.div`
position: absolute;
display:flex;
flex-direction:column;
align-items:center;
top: 0;
height: 90%;
transition: all 0.6s ease-in-out;
left: 0;
width: 50%;
z-index: 2;
${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 10px;
width: 40vw;
max-width:350px;
height: 100%;
text-align: center;
`;

export const Head = styled.h1`
font-weight: bold;
color:#D82323;
padding:10px 0px;
`;

export const Title = styled.h1`
font-weight: bold;
margin:50px;


`;

export const SignTitle = styled.h1`
font-weight: bold;
margin: 80px 0px 40px 0px;
`;

export const label =styled.label`
font-size: 0.75rem;
color: #818CF8;
font-weight: 700;
position: relative;
top: 0.5rem;
margin: 0 0 0 7px;
padding: 0 3px;
background: #e8e8e8;
width: fit-content;
`;

export const Input = styled.input`
background-color: #eee;
display: flex;
flex-direction: column;
width: fit-content;
position: static;
min-width: 250px;
max-width: 280px;
padding: 11px 10px;
font-size: 0.8 rem;
border: 2px #818CF8 solid;
border-radius: 5px;
background: #e8e8e8;
&:focus{
  outline: none;
}
`;


export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid  #9757C8;
   background-color: #9757C8;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
   letter-spacing: 1px;
   text-transform: uppercase;
   margin:20px;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;
export const GhostButton = styled(Button)`
background-color: transparent;
border-color: #ffffff;
`;

export const Otp = styled.a`
display:flex;
flex-direction:column;
color: #333;
font-size: 14px;
text-decoration: none;
margin: 10px 0;
`;

export const Anchor = styled.a`
display:flex;
flex-direction:column;
color: #333;
font-size: 14px;
text-decoration: none;
margin: 15px 0;
`;
export const OverlayContainer = styled.div`
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100;
${props =>
 props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
background: background: linear-gradient( #9757C8 0%, #831FDB 100%);;
background: -webkit-linear-gradient(to right, #9757C8 0%, #831FDB 100%);

background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  background: linear-gradient( #9757C8 0%, #831FDB 100%);
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
    background: linear-gradient( #9757C8 0%, #831FDB 100%);
    ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
font-size: 16px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 30 px;
`;

export const phInput = styled.input`
position": center;
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 100%;
`