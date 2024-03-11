import {useHttp} from '../hook/hook'

const Service = () => {
    const {request, process, setProcess} = useHttp()

    const getFact = async() => {
        const res = await request(`https://catfact.ninja/fact`)
        return _transformFact(res)
    }
    const _transformFact = (char) => {
        return{
            fact: char.fact ? char.fact : 'No fact',
        }
    }

   
    const getPerson = async(name) => {
        const res = await request(` https://api.agify.io/?name=${name}`)
      
        return _transformPerson(res)
    }
    const _transformPerson = (char) => {
        return{
            name: char.name ? char.name : 'No name',
            age: char.age ? char.age : 'No age',
            count: char.count ? char.count : 'No count',
        }
    }

    return{
        process,
        setProcess,
        getFact,
        getPerson
    }
}

export default Service