import { h } from "preact";
import {ErrorBoundary} from 'react-error-boundary'

export const AppError = ({error, resetErrorBoundary}: any) => {
  console.log(error)
  return (
    <div class="app-error container">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
};