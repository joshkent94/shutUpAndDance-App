import Image from 'next/image'

export default function SongDetails({ currentlyPlaying }) {
    return (
        <div className="flex h-3/5 w-full justify-center">
            <div className="flex w-[30%] items-center justify-center pr-2">
                <Image
                    src={currentlyPlaying.images[0].url}
                    alt={currentlyPlaying.name}
                    className="rounded-full"
                    width={75}
                    height={75}
                />
            </div>
            <div className="flex h-full w-[70%] flex-col justify-center">
                <p className="m-0 w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-[0.95rem]">
                    {currentlyPlaying.name}
                </p>
                <p className="m-0 line-clamp-2 w-[95%] text-[0.95rem]">
                    {currentlyPlaying.artist} || {currentlyPlaying.album}
                </p>
            </div>
        </div>
    )
}
