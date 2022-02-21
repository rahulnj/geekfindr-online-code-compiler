import ReactDom from 'react-dom';

import { Provider } from 'react-redux';

import { store } from './state';

import 'bulmaswatch/superhero/bulmaswatch.min.css'

import { CellList } from './components';



const App = () => {

    return (
        <Provider store={store}>
            <div>
                <CellList />
            </div>
        </Provider>
    )

}



ReactDom.render(
    <App />,
    document.getElementById('root')
)