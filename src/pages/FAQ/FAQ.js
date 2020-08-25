import React from 'react';
import './FAQ.scss';
function FAQ() {

return (
            <div className="FAQ-ctn">
                    <h1><b>FAQ</b></h1>
                    <h3>Subject 1</h3>
                    <div>
                    <dl>
                        <dt><b>FAQ 1</b></dt>
                        <dd><small>Answer to FAQ 1</small></dd>
                        <hr/>
                        <dt><b>FAQ 2</b></dt>
                        <dd><small>Answer to FAQ 2</small></dd>
                        <hr/>
                        <dt><b>FAQ 3</b></dt>
                        <dd><small>Answer to FAQ 3</small></dd>
                        <hr/>
                    </dl>
                    </div>
            </div>
            )
};
export default FAQ;