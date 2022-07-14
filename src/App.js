import { ScoringComponent } from "./scoring/ScoringComponent";
import json_data from "./stories/example-data/the-example";
import store from './redux/store'
import { Provider } from 'react-redux'
import json_data2 from "./stories/example-data/empty-tasks.json";
import json_data3 from "./stories/example-data/empty-aspects.json";

function App() {
  return (
    <Provider store={store}>
    <ScoringComponent
      criteria={json_data}
      onSubmit={results => console.log(results)}
      onCancel={draft => console.log(draft)}
    />
    </Provider>
  );
}

export default App;
