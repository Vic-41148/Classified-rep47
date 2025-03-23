import tkinter as tk

root=tk.Tk() #stored in var root

root.title("Central Armed Police Force - PET Form")

def openWindow():
    new_win=tk.TopLevel(root)                     #creatin the new window (child)
    new_win.title("Form-Submission")              #title of new win
    new_win.geometry(300*500)                     #size of new child window

    tk.label(new_win,text="Hello! This is a new window.").pack() #label inside the new window

    