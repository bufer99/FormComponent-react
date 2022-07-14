import FormHolder from "./FormHolder";
import './ScoringComponent.css'
import store from '../redux/store'
import { Provider } from 'react-redux'

export function ScoringComponent({ criteria, onSubmit, onCancel }) {
  if (criteria.tasks.length === 0) return (
    <>
      <div className="no-task">Nincsenek megjelenítendő feladatok!</div>
    </>
  )
  return (
    <>
      <Provider store={store}>
        <div className="form-container">
          <FormHolder criteria={criteria} onSubmit={onSubmit} onCancel={onCancel} />
        </div>
      </Provider>
    </>
  );
}