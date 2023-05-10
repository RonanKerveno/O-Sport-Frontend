import Card from "./card"

export default function cards() {
    return (
        <div className="flex flex-row justify-center space-x-4 overflow-x-auto">
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}