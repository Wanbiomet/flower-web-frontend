export const inStorage = (name, value, remember=false) => {
    remember ? 
        localStorage.setItem(name, value) : 
        sessionStorage.setItem(name, value)
}

export const fromStorage = name => {
    localStorage.getItem(name) || sessionStorage.getItem(name)
}

export const removeStorage = name => {
    localStorage.removeItem(name)
    sessionStorage.removeItem(name)
}