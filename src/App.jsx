import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote, addVote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id));
  }

  const submit = (event) => {
    event.preventDefault();
    const content = event.target.new_anecdote.value;
    dispatch(addAnecdote(content));
    event.target.new_anecdote.value = '';
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}&nbsp;
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div><input name="new_anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App