import styled from 'styled-components'

export const Card = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.white};

  border-radius: 32px;

  display: flex;
  flex-direction: column;
  
  box-shadow: ${({ theme }) => theme.boxShadows[0]};

  padding: ${({ theme }) => theme.spaces[4]}px;
`

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: black;
  display: flex;
  justify-content: center;
`

export const ProjectPageItem = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 0 1.25rem;
    cursor: pointer;
    &:hover {
      background-color: #2F4F4F;
      color: white;
      text-align: center;
      border-radius: 5px;
      span {
         color: white;
      }
  }
`

export const ScratchLink = styled.a`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 20px;
    text-decoration: none;
    color: black;
`