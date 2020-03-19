import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 700px) {
      flex-direction: column;
      align-items: center;  
      button, input {
        margin-top: 10px;
      }
      .statusBar {
        display: flex;
        flex-direction: column;
        align-items: center;  
        button {
          float: none
        }
      }
  }
`;