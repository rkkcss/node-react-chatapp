
const ChatHeaderSkeleton = () => {
    return (
        <div className="p-2 border-b border-b-alto-200 flex items-center gap-2 animate-pulse">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="flex flex-col gap-1">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-100 rounded" />
            </div>
        </div>
    )
}

export default ChatHeaderSkeleton