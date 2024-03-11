import { useState, useEffect } from "react";
import { SearchForm } from "./components/SearchFrom/SearchForm";
import { SearchContext } from "./components/UserCard/SearchContext";
import Service from "./Service/Service";
import setContent from './Utils/setContent'
import Spinner from "./Spinner/Spinner";
import Fact from './components/Facts/Fact'
import { UserCard } from "./components/UserCard/UserCard";
import {
  View,
  Panel,
  PanelHeader,
  Group,
  CellButton
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

export default function App() {
  const [person, setPerson] = useState({}); 
  const [valueForSearch, setValueForSearch] = useState('')
  const {getPerson, setProcess, process} = Service()
  const [activePanel, setActivePanel] = useState('panel1');
  
  const onChangeValue = (value) =>{
    setValueForSearch(value)
  }

  useEffect(() => {
    updateData()
  },[valueForSearch])

  const updateData = () => {
    getPerson(valueForSearch)
          .then(onDataLoaded)
          .then(() => setProcess('confirmed'))
          .catch(error => {
            if (error.message === 'FirstFind') {
                setProcess('FirstFind');
            } else if(error.message === 'No data'){
                setProcess('noData');
            }
        });
  }

  const onDataLoaded = (value) => {
    if(value.name == 'No name' && (process != 'loading' || process != 'waiting')) throw new Error('FirstFind')
    if(value.age == 'No age' && (process != 'loading' || process != 'waiting')) throw new Error('No data')
    setPerson(value)
  }

  const handlePanelChange = (panelId) => {
    setActivePanel(panelId);
  }

  return (
    <SearchContext.Provider value={{person}}>
      <View activePanel={activePanel}>
        <Panel id="panel1">
          <PanelHeader>Task 1</PanelHeader>
          <Group>
            <SearchForm onChangeValue={onChangeValue}/>
            {setContent(process,  <UserCard/>)}
            <CellButton onClick={() => handlePanelChange('panel2')}>Go to task 2</CellButton>
          </Group>
        </Panel>
        <Panel id="panel2">
          <PanelHeader>Task 2</PanelHeader>
          <Group>
            <Fact/>
            <CellButton onClick={() => handlePanelChange('panel1')}>Go to task 1</CellButton>
          </Group>
        </Panel>
      </View>
    </SearchContext.Provider>
  );
}
