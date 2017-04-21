import {cx, Route, Sandbox} from 'cx/widgets';

import AppLayout from '../layout';

import Default from './default';
import About from './about';
import Examples from './examples';

import Sections from '../sections';

export default <cx>
    <div outerLayout={AppLayout}>
        <Sandbox key={{ bind: "url" }} storage={{ bind: "pages" }}>
            <Route route="~/" url={{ bind: "url" }}>
                { Default }
            </Route>
            <Route route="~/about" url={{ bind: "url" }}>
                { About }
            </Route>
            <Route route="~/other%20examples" url={{ bind: "url" }}>
                { Examples }
            </Route>
            {Sections}
        </Sandbox>
    </div>
</cx>

