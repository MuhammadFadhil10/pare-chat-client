export const useDebounce = () => {
  return (callback: (...args: unknown[] | any) => void | unknown, wait?: number) => {
    let timeout: string | number | undefined | ReturnType<typeof setTimeout>;

    // This is the function that is returned and will be executed many times
    // We spread (...args) to capture any number of parameters we want to pass
    return function executedFunction(...args: unknown[]) {
      // The callback function to be executed after
      // the debounce time has elapsed
      const later = () => {
        // null timeout to indicate the debounce ended
        timeout = undefined;

        // Execute the callback
        callback(...args);
      };
      // This will reset the waiting every function execution.
      // This is the step that prevents the function from
      // being executed because it will never reach the
      // inside of the previous setTimeout
      clearTimeout(timeout);

      // Restart the debounce waiting period.
      // setTimeout returns a truthy value (it differs in web vs Node)
      timeout = setTimeout(later, wait ?? 500);
    };
  };
};
