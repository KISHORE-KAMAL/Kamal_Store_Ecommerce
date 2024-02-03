import React from 'react'
import styled from "styled-components"

function Contact() {
  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>

      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.7749143679!2d77.30126014190157!3d12.954459538695934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1703703487644!5m2!1sen!2sin" 
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowfullscreen="" 
        loading="lazy" 
        title='myMap'
        referrerpolicy="no-referrer-when-downgrade"></iframe>

      <div className="container">
        <div className="contact-form">
          <form action="" method="POST" className="contact-inputs">

            <input type="text" placeholder="username" name="username" required autoComplete="off" />

            <input type="email" name="Email" placeholder="Email" autoComplete="off" required />

            <textarea name="Message" cols="30" rows="10" required autoComplete="off" placeholder="Enter you message"></textarea>

            <input type="submit" value="send" />
            
          </form>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

export default Contact