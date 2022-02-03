import ReactDom from 'react-dom';

import 'bulmaswatch/superhero/bulmaswatch.min.css'

import { CodeCell } from './components';



const App = () => {

    return (
        <div>
            <CodeCell />
        </div>
    )

}



ReactDom.render(
    <App />,
    document.getElementById('root')
)