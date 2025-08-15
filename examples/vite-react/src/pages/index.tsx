import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import { NavLink  } from 'react-router'

function Index() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <NavLink to="/about">
          <button>/about</button>
        </NavLink>
        <NavLink to="/post">
          <button>/post</button>
        </NavLink>
        <NavLink to="/post/123">
          <button>/post/:id</button>
        </NavLink>
        <NavLink to="/post/123/comments">
          <button>/post/:id/comments</button>
        </NavLink>
        <NavLink to="/invalid-url">
          <button>not found page!!</button>
        </NavLink>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Index
