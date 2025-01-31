"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RankedView } from "./ranked-view"
import { MatchmakingView } from "./matchmaking-view"
import { PracticeView } from "./practice-view"
import { TrainingView } from "./training-view"
import { motion, AnimatePresence } from "framer-motion"

export default function GameLobby() {
  const [currentTab, setCurrentTab] = useState("ranked")
  const [filter, setFilter] = useState("todos")
  const [mounted, setMounted] = useState(false)
  const [isLobbyVisible, setIsLobbyVisible] = useState(true) // Set to true by default

  useEffect(() => {
    setMounted(true)

    // Agregar el event listener para los mensajes
    window.addEventListener("message", handleMessage)

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const handleMessage = (event: MessageEvent) => {
    if (event.data.action === "openLobby") {
      setIsLobbyVisible(true)
    }
    if (event.data.action === "closeLobby") {
      setIsLobbyVisible(false)
    }
  }

  if (!mounted) {
    return null
  }

  if (!isLobbyVisible) {
    return null
  }

  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white p-4 sm:p-6 lg:p-8 relative">
      <div className="absolute inset-0 bg-[url('/game-background.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <h1 className="text-2xl sm:text-3xl font-bold">Modos de Jogo</h1>
            {currentTab === "ranked" && (
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800/50 border-zinc-700 text-white">
                  <SelectValue placeholder="Filtro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="rifles">Rifles</SelectItem>
                  <SelectItem value="pistolas">Pistolas</SelectItem>
                  <SelectItem value="diversos">Diversos</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <Tabs defaultValue="ranked" onValueChange={setCurrentTab} className="w-full">
            <TabsList className="bg-zinc-800/50 p-1 rounded-lg">
              <TabsTrigger
                value="ranked"
                className="rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                RANKED
              </TabsTrigger>
              <TabsTrigger
                value="practice"
                className="rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                PRACTICE
              </TabsTrigger>
              <TabsTrigger
                value="matchmaking"
                className="rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                MATCHMAKING
              </TabsTrigger>
              <TabsTrigger
                value="training"
                className="rounded-md transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                TRAINING
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="mt-6"
              >
                <TabsContent value="ranked">
                  <RankedView filter={filter} />
                </TabsContent>
                <TabsContent value="practice">
                  <PracticeView />
                </TabsContent>
                <TabsContent value="matchmaking">
                  <MatchmakingView />
                </TabsContent>
                <TabsContent value="training">
                  <TrainingView />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

