import { Card, CardBody, CardFooter } from "@nextui-org/react"

interface TypeProps {
    item: any;
    index: number;
    action: () => void;
}

export default function MappingData({ item, index, action }: TypeProps) {
    return (
        <>
            <Card shadow="sm" key={index} className="bg-emerald-500" isPressable
                onPress={action}>
                <CardBody className="overflow-visible p-0">
                    <p className="h-20 p-2 bg-gray-500">{item.content}</p>
                </CardBody>
                <CardFooter className="text-small justify-between text-white h-16"
                    style={{ backgroundColor: item.pinned ? "rgb(16, 131, 67)" : "rgb(44, 44, 44)" }}
                >
                    <b className="text-xl">{item.label}</b>
                    <div>
                        <p className="text-white">created on: {item.date}</p>
                        {
                            item.updateDate === 0 ?
                                ""
                                :
                                <p className="text-white">last updated: {item.updateDate}</p>
                        }
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}
