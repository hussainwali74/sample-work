import NewChat from "./newchat"

function Sidebar() {
  return (
    <div className="flex flex-col p-2 h-screen">
        <div className="flex-1">
            <div>
                {/* new chat */}
                <NewChat />
                <div>
                    {/* model selection */}

                </div>
                {/* chatlist */}

            </div>
        </div>
saaa      
    </div>
  )
}

export default Sidebar
