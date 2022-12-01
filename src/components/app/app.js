import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "John C.", salary: 800, increase: false, star: true, id: 1},
                {name: "Alex M.", salary: 3000, increase: true, star: false, id: 2},
                {name: "Carl W.", salary: 5000, increase: false, star: false, id: 3}
            ]
        };
        this.lastId = 4;
    }

    addNewUser = (userName, userSalary) => {
        this.setState(state => {
            const newArr = [...state.data];
            newArr.push({name: userName, salary: userSalary, increase: false, star: false, id: this.lastId})
            this.lastId++;
            return {
                data: newArr
            }
        }) 
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);
            
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);

            // const newArr = [...before, ...after];

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    onToggleProp = (id, prop) => {

        this.setState (({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length
        return (
            <div className="app">
                <AppInfo
                employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeesAddForm
                    addNewUser={this.addNewUser}
                />
            </div>
        );
    }
}

export default App;