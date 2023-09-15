import { Content } from "./components/main-content/content";
import { Header } from "./components/header/header";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Content />
    </div>
  )
}
