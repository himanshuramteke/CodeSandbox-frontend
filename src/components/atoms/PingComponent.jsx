import usePing from "../../hooks/apis/queries/usePing"

export const PingComponent = () => {
    const { isLoading, data } = usePing();

    if(isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <>
         Hello {data.message}
        </>
    )
}