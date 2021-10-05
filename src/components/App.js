import React from "react";
import Lesson_6 from "./Lesson_6";
import styled from 'styled-components';
import Lesson_7 from "./Lesson_7";
import Lesson_8 from "./Lesson_8";
import Lesson_9 from "./Lesson_9";
import Lesson_11 from "./Lesson_11";
import Lesson_12 from "./Lesson_12";

const Select = styled.select`
  position: absolute;
  margin: 10px 0 0 20px;
`;

const Container = styled.div`
  position: fixed;
  margin: 0;
  padding: 0;
  outline: none;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: 'Lesson 6'
        }
    }

    componentDidMount() {
        const storage = localStorage.getItem('lesson');
        if (storage) {
            this.setState({selectValue: storage});
        } else {
            this.setState({selectValue: 'Lesson 6'});
        }
    }

    render = () => {
        const {selectValue} = this.state;
        return <Container>
            <Select onChange={this.selectChangeHandler} value={selectValue}>
                <option>{'Lesson 6'}</option>
                <option>{'Lesson 7'}</option>
                <option>{'Lesson 8'}</option>
                <option>{'Lesson 9'}</option>
                <option>{'Lesson 11'}</option>
                <option>{'Lesson 12'}</option>
            </Select>
            {this.getLesson()}
        </Container>
    }

    selectChangeHandler = (event) => {
        const {value} = event.target;
        this.setState({selectValue: value});
        localStorage.setItem('lesson', value);
    }

    getLesson = () => {
        const {selectValue} = this.state;
        switch (selectValue) {
            case 'Lesson 6': return <Lesson_6/>;
            case 'Lesson 7': return <Lesson_7/>;
            case 'Lesson 8': return <Lesson_8/>;
            case 'Lesson 9': return <Lesson_9/>;
            case 'Lesson 11': return <Lesson_11/>;
            case 'Lesson 12': return <Lesson_12/>;
        }
    }
}

export default App;
