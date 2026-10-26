export const runSafely = (operation: () => void): void => {
  try {
    operation()
  } catch {
    return
  }
}
