import ReactDom from 'react-dom';

import 'bulmaswatch/superhero/bulmaswatch.min.css'

import { CodeCell, TextEditor } from './components';



const App = () => {

    return (
        <div>
            <TextEditor />
            {/* <CodeCell /> */}
        </div>
    )

}



ReactDom.render(
    <App />,
    document.getElementById('root')
)