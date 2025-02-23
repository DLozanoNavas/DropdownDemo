using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BlazorApp9.Components
{
    public class DropdownItem
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
    }

    public partial class Dropdown : ComponentBase, IAsyncDisposable
    {
        private bool IsOpen;
        private DotNetObjectReference<Dropdown>? _dotNetRef;
        private readonly string DropdownId;
        private readonly string ButtonId;

        [Inject] public IJSRuntime JS { get; set; } = default!;

        [Parameter] public List<DropdownItem> Items { get; set; } = new();
        [Parameter] public EventCallback<DropdownItem> OnSelected { get; set; }
        public DropdownItem? SelectedItem { get; private set; }

        public Dropdown()
        {
            DropdownId = $"dropdown-{Guid.NewGuid()}";
            ButtonId = $"button-{Guid.NewGuid()}";
        }

        protected async Task ToggleDropdown()
        {
            IsOpen = !IsOpen;
            await JS.InvokeVoidAsync("utils.toggleDropdown", DropdownId, ButtonId);
        }

        private async Task SelectItem(DropdownItem item)
        {
            SelectedItem = item;
            await OnSelected.InvokeAsync(item);
            await JS.InvokeVoidAsync("utils.closeDropdown", DropdownId);
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                _dotNetRef = DotNetObjectReference.Create(this);
                await JS.InvokeVoidAsync("utils.registerDropdown", _dotNetRef, DropdownId);
            }
        }

        public async ValueTask DisposeAsync()
        {
            if (_dotNetRef is not null)
            {
                await JS.InvokeVoidAsync("utils.unregisterDropdown", _dotNetRef, DropdownId);
                _dotNetRef.Dispose();
            }
        }
    }
}
