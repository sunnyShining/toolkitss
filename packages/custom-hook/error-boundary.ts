import { PureComponent, useReducer, createElement as h, useMemo } from 'react'

interface ErrorInfo {
  /** Captures which component contained the exception, and its ancestors. */
  componentStack: string;
}

interface IErrorBoundaryState {
  hasError: boolean
  error: null | Error
}

interface IProps {
  /** 成功时渲染 */
  render?: (props: {[propName: string]: any}) => React.ReactNode
  /** 捕获到错误时渲染 */
  renderError?: (props: {[propName: string]: any; error: Error | null}) => React.ReactNode
  /** 其他props */
  [propName: string]: any
}

interface IErrorBoundaryProps extends IProps {
  /** 捕获失败后回调 */
  onDidcapture (error: Error, errorInfo: ErrorInfo): void
}

/** 错误边界组件 */
class ErrorBoundary extends PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }
  static getDerivedStateFromError (error: Error) {
    return { hasError: true, error }
  }
  componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    const { onDidcapture } = this.props
    onDidcapture && onDidcapture(error, errorInfo)
  }
  render () {
    const { hasError, error } = this.state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { render, renderError, onDidcapture, ...others } = this.props
    if (hasError) {
      return renderError ? renderError({ ...others, error }) : null
    }
    return render? render(others) : (this.props.children || null)
  }
}

/** 错误边界组件高阶 */
function ErrorBoundaryHoc ({ onDidcapture }): React.FC<IProps> {
  return (props: IProps) =>  h(ErrorBoundary, {
    onDidcapture,
    ...props
  })
}

interface IUseErrorBoundaryState {
  /** 是否捕获到错误 */
  captureError: boolean
  /** 捕获到的错误 */
  error: null | Error
  /** 错误信息 */
  errorInfo: null | ErrorInfo
}
interface IUseErrorBoundaryAction {
  /** 是否捕获到错误 */
  captureError?: boolean
  /** 捕获到的错误 */
  error?: null | Error
  errorInfo?: null | ErrorInfo
  /** 类型 */
  type: 'capture' | 'reset'
}
/** reducer */
const errorBoundaryReducer = (state: IUseErrorBoundaryState, action: IUseErrorBoundaryAction) => {
  switch (action.type) {
    case 'capture':
      return {
        ...state,
        captureError: true,
        error: action.error,
        errorInfo: action.errorInfo
      }
    default:
      return state
  }
}
export const useErrorBoundary = () => {
  const [{captureError, error, errorInfo }, dispatch] = useReducer<typeof errorBoundaryReducer>(
    errorBoundaryReducer,
    {
      captureError: false,
      error: null,
      errorInfo: null
    }
  )
  const WrappedErrorBoundary = useMemo(
    () => ErrorBoundaryHoc({
      onDidcapture (error: Error, errorInfo: ErrorInfo) {
        dispatch({
          type: 'capture',
          error,
          errorInfo
        })
      }
    }), []
  )
  return {
    ErrorBoundary: WrappedErrorBoundary,
    captureError,
    error,
    errorInfo
  }
}
