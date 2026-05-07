interface FooterProps {
  text: string
}

export default function Footer ({ text }: FooterProps) {
  return (
    <footer className="footer num-font">{text}</footer>
  )
}
