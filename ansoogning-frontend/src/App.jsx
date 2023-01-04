import logo from './logo.svg';
import styles from './App.module.css';
import AdminMain from './sections/AdminPanel/AdminMain';
import { createSignal, Match, Switch } from 'solid-js';
import FlowMain from './sections/Flow/FlowMain';
import { Button } from '@hope-ui/solid';

const [admin,setAdmin] = createSignal(false)

function setButton(){
  if (admin() == true) {
    setAdmin(false)
  }
  else {
    setAdmin(true)
  }
}

function App() {
  return (
    <div>
      <Button onClick={()=>{setButton()}}>Skift til Admin side</Button>
      <Switch>
        <Match when={admin()}>
          <AdminMain></AdminMain>

        </Match>
        <Match when={!admin()}>
        <FlowMain></FlowMain>
        </Match>

      </Switch>
      
    </div>
  );
}

export default App;
