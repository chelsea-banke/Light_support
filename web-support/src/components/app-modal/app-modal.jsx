import { useEffect, useState } from "react"
import "./app-modal.css"

export const AppModal = ({
	title = "Modal",
	id = "",
	open = false,
	onClose,
	closeOnBackdrop = true,
	children
}) => {
	const [isMounted, setIsMounted] = useState(open)
	const [isClosing, setIsClosing] = useState(false)

	// handle mount/unmount with animation
	useEffect(() => {
		if (open) {
			setIsMounted(true)
			setIsClosing(false)
		} else if (isMounted) {
			setIsClosing(true)
			const t = setTimeout(() => {
				setIsMounted(false)
				setIsClosing(false)
			}, 500) // longer to match bounce-out duration
			return () => clearTimeout(t)
		}
	}, [open, isMounted])

	if (!isMounted) return null

	const handleBackdrop = () => {
		if (!closeOnBackdrop) return
		onClose?.()
	}

	return (
		<div
			id={`app-modal-${id}`}
			className={`app-modal ${isClosing ? "fade-out" : "fade-in"}`}
			role="dialog"
			aria-modal="true"
			aria-labelledby={`app-modal-title-${id}`}
		>
			<div
				className={`modal-content ${isClosing ? "bounce-out" : "bounce-in"}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-header">
					<div id={`app-modal-title-${id}`} className="modal-title text-center">{title}</div>
					<button
						type="button"
						className="modal-close"
						aria-label="Close modal"
						onClick={() => onClose?.()}
					>
						✕
					</button>
				</div>

				<div className="modal-body">{children}</div>
			</div>
		</div>
	)
}
