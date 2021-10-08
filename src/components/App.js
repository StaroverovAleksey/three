import React from "react";
import Lesson_6 from "./Lesson_6";
import styled from 'styled-components';
import Lesson_7 from "./Lesson_7";
import Lesson_8 from "./Lesson_8";
import Lesson_9 from "./Lesson_9";
import Lesson_10 from "./Lesson_10";
import Lesson_11 from "./Lesson_11";
import Lesson_12 from "./Lesson_12";
import Lesson_13 from "./Lesson_13";
import Lesson_14 from "./Lesson_14";
import Lesson_15 from "./Lesson_15";
import Lesson_16 from "./Lesson_16";
import Lesson_17 from "./Lesson_17";
import Lesson_18 from "./Lesson_18";

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
                <option>{'Lesson 10'}</option>
                <option>{'Lesson 11'}</option>
                <option>{'Lesson 12'}</option>
                <option>{'Lesson 13'}</option>
                <option>{'Lesson 14'}</option>
                <option>{'Lesson 15'}</option>
                <option>{'Lesson 16'}</option>
                <option>{'Lesson 17'}</option>
                <option>{'Lesson 18'}</option>
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
            case 'Lesson 10': return <Lesson_10/>;
            case 'Lesson 11': return <Lesson_11/>;
            case 'Lesson 12': return <Lesson_12/>;
            case 'Lesson 13': return <Lesson_13/>;
            case 'Lesson 14': return <Lesson_14/>;
            case 'Lesson 15': return <Lesson_15/>;
            case 'Lesson 16': return <Lesson_16/>;
            case 'Lesson 17': return <Lesson_17/>;
            case 'Lesson 18': return <Lesson_18/>;
        }
    }
}

export default App;
