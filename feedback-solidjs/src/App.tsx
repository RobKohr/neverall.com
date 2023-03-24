import { Component, lazy } from 'solid-js';
import { Routes, Route, A } from '@solidjs/router';
const Auth = lazy(() => import('./routes/auth'));
const Home = lazy(() => import('./routes'));
export default function App() {
  return (
    <>
      <h1>My Site with Lots of Pages</h1>
      <nav>
        <A href='/about'>About</A>
        <A href='/'>Home</A>
        <A href='/auth'>Login/Register</A>
      </nav>
      <Routes>
        <Route path='/' component={Home} />
        <Route path='/auth' component={Auth} />
        <Route
          path='/about'
          element={<div>This site was made with Solid</div>}
        />
      </Routes>
    </>
  );
}

// import logo from './logo.svg';
// import styles from './App.module.css';
// const App: Component = () => {
//   return (
//     <div class={styles.App}>
//       <header class={styles.header}>
//         <img src={logo} class={styles.logo} alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           class={styles.link}
//           href="https://github.com/solidjs/solid"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn Solid
//         </a>
//       </header>
//     </div>
//   );
// };
