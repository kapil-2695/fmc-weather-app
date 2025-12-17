import React from "react"


export default function useDropdownToggle(closeOnOutsideClick = false) {
    const [open, setOpen] = React.useState(false)
    const dropdownRef = React.useRef(null)

    function toggleMenu(forcedValue) {
        setOpen(prev => {
            if(forcedValue === true || forcedValue === false) return forcedValue
            return !prev
        })
    }

    React.useEffect(() => {
        function handleClicksOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
            if(event?.key === "Escape")  setOpen(false)
        }

        if (closeOnOutsideClick) {
            if (open) {
                document.addEventListener("click", handleClicksOutside)
                document.addEventListener("keydown", handleClicksOutside)
            }

            return () => {
                document.removeEventListener("click", handleClicksOutside)
                document.removeEventListener("keydown", handleClicksOutside)
            }
        }
    }, [open])

    return [open, toggleMenu, dropdownRef]
}