import {register} from '../registry';

import { Controller, KeySelection } from 'cx/ui';
import { cx, DragHandle, FlexRow, Grid, HtmlElement, Rescope } from 'cx/widgets';



class PageController extends Controller {
  init() {
    this.store.init(
      "grid1",
      Array.from({ length: 15 }, (_, c) => ({
        id: c + 1,
        name: "Item " + (c + 1),
        number: Math.random() * 100
      }))
    );

    this.store.init(
      "grid2",
      Array.from({ length: 15 }, (_, c) => ({
        id: 10000 + c + 1,
        name: "Item " + (c + 1),
        number: Math.random() * 100
      }))
    );
  }
}

register('Examples', 'Grid', <cx>
    <h2 putInto="header">Examples</h2>
    <Rescope bind="$page">
      <div class="example pad" controller={PageController}>
        <FlexRow>
          <h1>Hello</h1>
        </FlexRow>
      </div>
    </Rescope>
  </cx>
);









