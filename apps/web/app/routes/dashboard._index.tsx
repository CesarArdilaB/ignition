// import { protectedLoader } from "~/components/auth/protected-route";
import { ProtectedRoute } from "~/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

// Remove loader export
// export { protectedLoader as loader };

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Memo
          </Button>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Memos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No recent memos. Create your first memo to get started.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No active projects. Create a project to organize your memos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No reports available. Generate reports from your memos and projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
} 