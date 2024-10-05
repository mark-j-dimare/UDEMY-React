import { useState } from 'react';
import Section from '../Sections/Section.jsx';
import { EXAMPLES } from './../../data.js';
import Tabs from "../Tabs/Tabs.jsx";
import TabButton from "../../components/TabButton.jsx";

export default function Examples() {
    // destructure useState, which always gives an array with 2 values
    const [selectedTopic, setSelectedTopic] = useState();

    function handleSelect(selectedButton) {
        //selectedButton => 'components', 'jsx', 'props', 'state' 
        setSelectedTopic(selectedButton);
    }

    let tabContent = 'Please select a topic.';

    if (selectedTopic) {
        tabContent = (
            <div id="tab-content">
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>{EXAMPLES[selectedTopic].description}</p>
                <pre>
                    <code>{EXAMPLES[selectedTopic].code}</code>
                </pre>
            </div>
        )
    };

    return (
        <Section title="Examples" id="examples">
            <Tabs
                buttons={
                    <>
                        <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleSelect('components')}>Components</TabButton>
                        <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleSelect('jsx')}>JSX</TabButton>
                        <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleSelect('props')}>Props</TabButton>
                        <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleSelect('state')}>State</TabButton>
                    </>
                }>{tabContent}</Tabs>
        </Section>
    );
}