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
            ],
            term: '',
            filter: 'all'
        };
        this.lastId = 4;
    }

    onSalaryChange = (e, id) => {
        const inputVal = e.target.value;
        this.setState(state => {
            const newArr = state.data.map(item => {
                if (id === item.id) {
                    return {
                        ...item,
                        salary: inputVal.substring(0, inputVal.length - 1)
                    };
                }
                return item;
            })
            return {
                data: newArr
            }
        })
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

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.star);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onSalaryChange={this.onSalaryChange}
                />
                <EmployeesAddForm
                    addNewUser={this.addNewUser}
                />
            </div>
        );
    }
}

export default App;