import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { Mail, Phone, MapPin, Edit2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function DashboardProfile() {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Hotspot owner and KonnectX enthusiast",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
      });
    }
    setIsEditing(false);
  };

  return (
    <>
      <Helmet>
        <title>User Profile | KonnectX</title>
        <meta
          name="description"
          content="View and manage your KonnectX user profile. Update personal information, settings, and account preferences securely."
        />
        <meta
          name="keywords"
          content="KonnectX, user profile, account settings, dashboard, KXT token, decentralized network"
        />
        <meta property="og:title" content="User Profile - KonnectX" />
        <meta
          property="og:description"
          content="View and manage your KonnectX user profile. Update personal information, settings, and account preferences securely."
        />
      </Helmet>

    <div className="space-y-6 max-w-4xl">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-start gap-4 mb-6 md:mb-0">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
              <p className="text-foreground/60">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Account</p>
              <p className="text-sm text-foreground/50 mt-1">Member since January 2024</p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Edit2 size={16} />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </Card>

      {/* Profile Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
        
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Save Changes
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-foreground/60 mb-2">Full Name</p>
                <p className="text-foreground font-medium">{formData.name}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-2">Email</p>
                <div className="flex items-center gap-2 text-foreground">
                  <Mail size={16} className="text-primary" />
                  {formData.email}
                </div>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-2">Phone</p>
                <div className="flex items-center gap-2 text-foreground">
                  <Phone size={16} className="text-primary" />
                  {formData.phone}
                </div>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-2">Location</p>
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin size={16} className="text-primary" />
                  {formData.location}
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-2">Bio</p>
              <p className="text-foreground">{formData.bio}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition cursor-pointer">
            <div>
              <p className="font-medium text-foreground">Change Password</p>
              <p className="text-sm text-foreground/60">Update your password regularly</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition cursor-pointer">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-foreground/60">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition cursor-pointer">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-foreground/60">Manage your notification preferences</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200 dark:border-red-900/30">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-6">Danger Zone</h3>
        <Button
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20 w-full"
        >
          Delete Account
        </Button>
      </Card>
    </div>
    </>
  );
}
