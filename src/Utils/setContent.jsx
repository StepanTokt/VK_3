import Spinner from "../Spinner/Spinner"
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const setContent = (process, Component) => {
    switch(process){
        case 'waiting': 
            return <Spinner/>
        case 'loading':
            return <Spinner/>
        case 'confirmed': 
            return Component
        case 'error':
            return <ErrorMessage/>
        case 'noData':
            return <h1 style={{textAlign:'center'}}>По вашему запросу ничего не найдено...</h1>
        case 'FirstFind':
            return <h1 style={{textAlign:'center'}}>Введите данные для поиска</h1>
        default:
            throw new Error("Unexpected process state")
    }
}

export default setContent