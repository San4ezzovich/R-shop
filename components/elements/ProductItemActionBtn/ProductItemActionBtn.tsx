import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { IProductItemActionBtnProps } from '@/types/elements'
import styles from '@/styles/product-item/index.module.scss'

const Tooltip = ({ text }: { text: string }) => (
    <div className={styles.tooltip__inner}>
        <span className={styles.tooltip__text}>{text}</span>
    </div>
)

const ProductItemActionBtn = ({
                                  text,
                                  callback,
                                  iconClass,
                                  marginBottom,
                                  spinner,
                                  withTooltip = true,
                              }: IProductItemActionBtnProps) => {
    const [open, setOpen] = useState(false)
    const [tooltipLeft, setTooltipLeft] = useState(0)
    const showTooltip = () => setOpen(true)
    const hideTooltip = () => setOpen(false)
    const tooltipRef = useRef() as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        if (open && withTooltip) {
            setTooltipLeft(tooltipRef.current.clientWidth)
        }
    }, [open, withTooltip])

    return (
        <div className={styles.actions}>
            <button
                className={`btn-reset ${styles.actions__btn} ${styles[iconClass]}`}
                onClick={callback}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                style={{ marginBottom: marginBottom || 16 }}
            >
                {spinner && <FontAwesomeIcon icon={faSpinner} spin color='#fff' />}
            </button>
            {withTooltip && (
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.tooltip}
                            style={{ left: `-${tooltipLeft + 13}px` }}
                            ref={tooltipRef}
                        >
                            <Tooltip text={text} />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    )
}

export default ProductItemActionBtn