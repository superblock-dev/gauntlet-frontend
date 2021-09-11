import styled, { keyframes } from "styled-components";
import logo from "../../assets/logo.svg";

const AppContainer = styled.div`
  text-align: center;
`;

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${AppLogoSpin} infinite 20s linear;
  }
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLink = styled.a`
  color: #61dafb;
`;

function App() {
    return (
        <AppContainer className="App">
            <Header className="App-header">
                <AppLogo src={logo} alt="logo" />
                <p>
                    Edit
                    {" "}
                    <code>src/App.tsx</code>
                    {" "}
                    and save to reload.
                </p>
                <AppLink
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </AppLink>
            </Header>
        </AppContainer>
    );
}

export default App;
