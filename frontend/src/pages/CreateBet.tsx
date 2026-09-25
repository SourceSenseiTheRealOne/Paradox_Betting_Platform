import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, PlusCircle, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const CreateBet = () => {
  const [date, setDate] = useState<Date>();
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [initialOdds1, setInitialOdds1] = useState("");
  const [initialOdds2, setInitialOdds2] = useState("");
  const [minStake, setMinStake] = useState("");

  const handleCreateBet = () => {
    if (!eventName || !description || !category || !option1 || !option2 || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Demo only: form cleared", {
      description: "No bet was saved or submitted to a contract.",
    });

    // Reset form
    setEventName("");
    setDescription("");
    setCategory("");
    setOption1("");
    setOption2("");
    setInitialOdds1("");
    setInitialOdds2("");
    setMinStake("");
    setDate(undefined);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Demo bet form</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Simulate a bet form</h1>
          <p className="text-xl text-muted-foreground">
            Demo form only. Nothing is persisted or sent to the escrow. Do not enter sensitive information.
          </p>
        </div>

        <Card className="p-8 border-border/50">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCreateBet(); }}>
            {/* Event Name */}
            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-base font-semibold">
                Event Name *
              </Label>
              <Input
                id="eventName"
                placeholder="e.g., Lakers vs Celtics - NBA Finals"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="text-base"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Provide details about the betting event..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24 text-base"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-semibold">
                Category *
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="text-base">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sports">⚽ Sports</SelectItem>
                  <SelectItem value="crypto">₿ Crypto</SelectItem>
                  <SelectItem value="esports">🎮 E-Sports</SelectItem>
                  <SelectItem value="events">🎭 Events</SelectItem>
                  <SelectItem value="custom">🎯 Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Betting Options */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="option1" className="text-base font-semibold">
                  Option 1 *
                </Label>
                <Input
                  id="option1"
                  placeholder="e.g., Lakers"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                  className="text-base"
                />
                <Label htmlFor="odds1" className="text-sm text-muted-foreground">
                  Initial Odds (Optional)
                </Label>
                <Input
                  id="odds1"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 1.85"
                  value={initialOdds1}
                  onChange={(e) => setInitialOdds1(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="option2" className="text-base font-semibold">
                  Option 2 *
                </Label>
                <Input
                  id="option2"
                  placeholder="e.g., Celtics"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                  className="text-base"
                />
                <Label htmlFor="odds2" className="text-sm text-muted-foreground">
                  Initial Odds (Optional)
                </Label>
                <Input
                  id="odds2"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 2.10"
                  value={initialOdds2}
                  onChange={(e) => setInitialOdds2(e.target.value)}
                />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Event End Date *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Minimum Stake */}
            <div className="space-y-2">
              <Label htmlFor="minStake" className="text-base font-semibold">
                Minimum Stake (Optional)
              </Label>
              <Input
                id="minStake"
                type="number"
                placeholder="e.g., 10 USDC"
                value={minStake}
                onChange={(e) => setMinStake(e.target.value)}
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Leave empty for no minimum stake requirement
              </p>
            </div>

            {/* Preview Card */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3">Preview</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Event:</span>{" "}
                  <span className="font-semibold">{eventName || "Not set"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Options:</span>{" "}
                  <span className="font-semibold">
                    {option1 || "Option 1"} vs {option2 || "Option 2"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">End Date:</span>{" "}
                  <span className="font-semibold">
                    {date ? format(date, "PPP") : "Not set"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button type="submit" variant="hero" size="lg" className="w-full gap-2">
              <PlusCircle className="w-5 h-5" />
              Simulate bet creation
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Simulation only: submitting clears the form without creating a bet.
            </p>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateBet;
