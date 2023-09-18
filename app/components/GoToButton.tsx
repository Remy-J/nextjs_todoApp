'use client';
import { useRouter } from 'next/navigation'

interface Props {
  path: string
  label: string
  additionalClass?: string
}

const GoToButton = ({ path, label, additionalClass }: Props) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(path)
  }
  return (
    <div>
      <button onClick={handleClick} className={`btn ${additionalClass}`}>
        {label}
      </button>
    </div>
  )
}

export default GoToButton
