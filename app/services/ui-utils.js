import { Feedback, FeedbackType, FeedbackPosition } from 'nativescript-feedback'

const Alert = {
  showAlert(config) {
    const feedback = new Feedback()
    const types = {
      'success': FeedbackType.Success,
      'warning': FeedbackType.Warning,
      'error': FeedbackType.Error,
      'info': FeedbackType.Info,
    }

    feedback.show({
      title: config.title,
      message: config.message,
      position: FeedbackPosition.Top,
      type: types[config.type || 'info'],
      duration: config.duration || 4000
    })
  }
}

export { Alert }